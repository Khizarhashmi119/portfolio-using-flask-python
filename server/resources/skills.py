
from flask_restful import Resource

from constants import DATA_KEY, MESSAGES_KEY, NOT_AUTHORIZED, SKILL_DELETED, SKILL_NAME_REQUIRED, SKILL_NOT_FOUND, STATUS_FAILURE, STATUS_KEY, STATUS_SUCCESS
from decorators.auth_required import auth_required
from models import db, Skill
from parsers.skills import skill_create_parser, skill_get_parser


class SkillsResource(Resource):
    def get(self):
        args = skill_get_parser.parse_args()
        limit = args.get('limit')
        offset = args.get('offset')

        try:
            query = Skill.query

            if limit:
                query = query.limit(limit)

            if offset:
                query = query.offset(offset)

            skills = query.all()
            skills = [skill.get_skill_response() for skill in skills]

            return {
                STATUS_KEY: STATUS_SUCCESS,
                DATA_KEY: {
                    'skills': skills
                }
            }, 200
        except Exception as exception:
            return {
                STATUS_KEY: STATUS_FAILURE,
                DATA_KEY: {
                    MESSAGES_KEY: [str(exception)]
                }
            }, 500

    @auth_required
    def post(admin, self):
        args = skill_create_parser.parse_args()
        skill_name = args.get('skill_name')
        admin_uid = admin.uid

        error_messages = []

        if not skill_name:
            error_messages.append(SKILL_NAME_REQUIRED)

        if len(error_messages):
            return {
                STATUS_KEY: STATUS_FAILURE,
                DATA_KEY: {
                    MESSAGES_KEY: error_messages
                }
            }, 400

        try:
            skill = Skill(skill_name, admin_uid)
            db.session.add(skill)
            db.session.commit()

            return {
                STATUS_KEY: STATUS_SUCCESS,
                DATA_KEY: {
                    'skill': skill.get_skill_response()
                }
            }, 201
        except Exception as exception:
            return {
                STATUS_KEY: STATUS_FAILURE,
                DATA_KEY: {
                    MESSAGES_KEY: [str(exception)]
                }
            }, 500


class SkillResource(Resource):
    @auth_required
    def delete(admin, self, skill_uid):
        admin_uid = admin.uid

        try:
            skill = Skill.query.filter_by(uid=skill_uid).first()

            if not skill:
                return {
                    STATUS_KEY: STATUS_FAILURE,
                    DATA_KEY: {
                        MESSAGES_KEY: [SKILL_NOT_FOUND]
                    }
                }, 400

            if skill.admin_uid != admin_uid:
                return {
                    STATUS_KEY: STATUS_FAILURE,
                    DATA_KEY: {
                        MESSAGES_KEY: [NOT_AUTHORIZED]
                    }
                }, 401

            Skill.query.filter_by(uid=skill_uid).delete()
            db.session.commit()

            return {
                STATUS_KEY: STATUS_SUCCESS,
                DATA_KEY: {
                    'uid': skill_uid,
                    MESSAGES_KEY: [SKILL_DELETED]
                }
            }, 201
        except Exception as exception:
            return {
                STATUS_KEY: STATUS_FAILURE,
                DATA_KEY: {
                    MESSAGES_KEY: [str(exception)]
                }
            }, 500
