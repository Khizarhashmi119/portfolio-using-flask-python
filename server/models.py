import datetime as dt
import pytz
import uuid
import re

from flask_sqlalchemy import SQLAlchemy
from jwt import decode, encode, ExpiredSignatureError, InvalidTokenError
from sqlalchemy.dialects.postgresql import UUID
from werkzeug.security import check_password_hash, generate_password_hash

from constants import email_regex, PASSWORD_WRITE_ONLY, SECRET_KEY, STATUS_KEY, TOKEN_DECODED, TOKEN_EXPIRED, TOKEN_INVALID
from config import app

db = SQLAlchemy(app)


class Admin(db.Model):
    __tablename__ = 'admins'

    uid = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.Text(), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False,
                           default=dt.datetime.now(tz=pytz.UTC))
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False,
                           default=dt.datetime.now(tz=pytz.UTC), onupdate=dt.datetime.now(tz=pytz.UTC))

    def __init__(self, first_name, last_name, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password_hash = generate_password_hash(password)

    def __repr__(self):
        return f'Admin(uid={self.uid}, first_name={self.first_name}, last_name={self.last_name} created_at={self.created_at}, updated_at={self.updated_at})'

    @property
    def password(self):
        raise AttributeError(PASSWORD_WRITE_ONLY)

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password, salt_length=32)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def encode_token(self):
        payload = {
            'exp': dt.datetime.utcnow() + dt.timedelta(minutes=60),
            'iat': dt.datetime.utcnow(),
            'uid': str(self.uid)
        }

        return encode(payload, key=SECRET_KEY, algorithm="HS256")

    def get_admin_response(self):
        return {
            'uid': str(self.uid),
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'created_at': str(self.created_at),
            'updated': str(self.updated_at)
        }

    @staticmethod
    def validate_email(email):
        return True if (re.fullmatch(email_regex, email)) else False

    @staticmethod
    def decode_token(token):
        try:
            payload = decode(token, key=SECRET_KEY, algorithms=["HS256"])
            admin_uid = payload.get('uid')
            return {STATUS_KEY: TOKEN_DECODED, 'admin_uid': admin_uid}
        except ExpiredSignatureError:
            return {STATUS_KEY: TOKEN_EXPIRED}
        except InvalidTokenError:
            return {STATUS_KEY: TOKEN_INVALID}
        except Exception as exception:
            return {STATUS_KEY: str(exception)}


project_skill = db.Table('project_skill',
                         db.Column('project_id', UUID(as_uuid=True),
                                   db.ForeignKey('projects.uid')),
                         db.Column('skill_id', UUID(as_uuid=True),
                                   db.ForeignKey('skills.uid'))
                         )


class Project(db.Model):
    __tablename__ = 'projects'

    uid = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    repo_url = db.Column(db.String(255))
    url = db.Column(db.String(255))
    cover_image_url = db.Column(db.String(255),  nullable=False)
    admin_uid = db.Column(UUID(as_uuid=True), db.ForeignKey(
        "admins.uid"), nullable=False)
    admin = db.relationship(
        'Admin',
        backref='projects',
        lazy='joined'
    )
    skills = db.relationship(
        'Skill', secondary=project_skill, backref='projects')
    created_at = db.Column(db.DateTime(timezone=True), nullable=False,
                           default=dt.datetime.now(tz=pytz.UTC))
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False,
                           default=dt.datetime.now(tz=pytz.UTC), onupdate=dt.datetime.now(tz=pytz.UTC))

    def __init__(self, title, description, repo_url, url, cover_image_url, admin_uid):
        self.title = title
        self.description = description
        self.repo_url = repo_url
        self.url = url
        self.cover_image_url = cover_image_url
        self.admin_uid = admin_uid

    def __repr__(self):
        return f'Project(uid={self.uid}, title={self.title}, created_at={self.created_at}, updated_at={self.updated_at})'

    def get_project_response(self):
        return {
            'uid': str(self.uid),
            'title': self.title,
            'description': self.description,
            'repo_url': self.repo_url,
            'url': self.url,
            'cover_image_url': self.cover_image_url,
            'admin_uid': str(self.admin_uid),
            'skills': [skill.get_skill_response() for skill in self.skills],
            'created_at': str(self.created_at),
            'updated': str(self.updated_at)
        }

    def get_skill_project_response(self):
        return {
            'uid': str(self.uid),
            'title': self.title,
            'description': self.description,
            'repo_url': self.repo_url,
            'url': self.url,
            'cover_image_url': self.cover_image_url,
            'admin_uid': str(self.admin_uid),
            'created_at': str(self.created_at),
            'updated': str(self.updated_at)
        }


class Skill(db.Model):
    __tablename__ = 'skills'

    uid = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(255), nullable=False)
    admin_uid = db.Column(UUID(as_uuid=True), db.ForeignKey(
        "admins.uid"), nullable=False)
    admin = db.relationship(
        'Admin',
        backref='skills',
        lazy='joined'
    )
    created_at = db.Column(db.DateTime(timezone=True), nullable=False,
                           default=dt.datetime.now(tz=pytz.UTC))
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False,
                           default=dt.datetime.now(tz=pytz.UTC), onupdate=dt.datetime.now(tz=pytz.UTC))

    def __init__(self, name, admin_uid):
        self.name = name
        self.admin_uid = admin_uid

    def __repr__(self):
        return f'Skill(uid={self.uid}, name={self.name}, created_at={self.created_at}, updated_at={self.updated_at})'

    def get_skill_response(self):
        return {
            'uid': str(self.uid),
            'name': self.name,
            'admin_uid': str(self.admin_uid),
            'created_at': str(self.created_at),
            'updated': str(self.updated_at)
        }
