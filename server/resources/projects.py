import cloudinary
import cloudinary.uploader
import cloudinary.api

from flask_restful import Resource

from constants import COVER_IMAGE_DELETED_OK, COVER_IMAGE_REQUIRED, DATA_KEY, DESCRIPTION_REQUIRED, MESSAGES_KEY, NOT_AUTHORIZED, PROJECT_DELETED, PROJECT_NOT_FOUND, STATUS_FAILURE, STATUS_KEY, STATUS_SUCCESS, TITLE_REQUIRED
from decorators.auth_required import auth_required
from models import db, Project
from parsers.projects import project_create_parser, project_get_parser, project_update_parser

config = cloudinary.config(secure=True)


class ProjectsResource(Resource):
    def get(self):
        args = project_get_parser.parse_args()
        limit = args.get('limit')
        offset = args.get('offset')

        try:
            query = Project.query

            if limit:
                query = query.limit(limit)

            if offset:
                query = query.offset(offset)

            projects = query.all()
            projects = [project.get_project_response()
                        for project in projects]

            return {
                STATUS_KEY: STATUS_SUCCESS,
                DATA_KEY: {
                    'projects': projects
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
        args = project_create_parser.parse_args()
        title = args.get('title')
        description = args.get('description')
        repo_url = args.get('repo_url')
        url = args.get('url')
        cover_image = args.get('cover_image')
        admin_uid = admin.uid

        error_messages = []

        if not title:
            error_messages.append(TITLE_REQUIRED)
        if not description:
            error_messages.append(DESCRIPTION_REQUIRED)
        if not cover_image:
            error_messages.append(COVER_IMAGE_REQUIRED)

        if len(error_messages):
            return {
                STATUS_KEY: STATUS_FAILURE,
                DATA_KEY: {
                    MESSAGES_KEY: error_messages
                }
            }, 400

        try:
            cloudinary.uploader.upload_resource(
                cover_image, public_id=title, unique_filename=False, overwrite=True)

            cover_image_url = cloudinary.CloudinaryImage(title).build_url()
            project = Project(title, description, repo_url,
                              url, cover_image_url, admin_uid)
            db.session.add(project)
            db.session.commit()

            return {
                STATUS_KEY: STATUS_SUCCESS,
                DATA_KEY: {
                    'project': project.get_project_response()
                }
            }, 201
        except Exception as exception:
            return {
                STATUS_KEY: STATUS_FAILURE,
                DATA_KEY: {
                    MESSAGES_KEY: [str(exception)]
                }
            }, 500


class ProjectResource(Resource):
    def get(self, project_uid):
        try:
            project = Project.query.filter_by(uid=project_uid).first()

            if not project:
                return {
                    STATUS_KEY: STATUS_FAILURE,
                    DATA_KEY: {
                        MESSAGES_KEY: [PROJECT_NOT_FOUND]
                    }
                }, 400

            return {
                STATUS_KEY: STATUS_SUCCESS,
                DATA_KEY: {
                    'project': project.get_project_response()
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
    def patch(admin, self, project_uid):
        args = project_update_parser.parse_args()
        title = args.get('title')
        description = args.get('description')
        repo_url = args.get('repo_url')
        url = args.get('url')
        admin_uid = admin.uid

        try:
            project = Project.query.filter_by(uid=project_uid).first()

            if not project:
                return {
                    STATUS_KEY: STATUS_FAILURE,
                    DATA_KEY: {
                        MESSAGES_KEY: [PROJECT_NOT_FOUND]
                    }
                }, 400

            if project.admin_uid != admin_uid:
                return {
                    STATUS_KEY: STATUS_FAILURE,
                    DATA_KEY: {
                        MESSAGES_KEY: [NOT_AUTHORIZED]
                    }
                }, 401

            if title:
                rename_cover_image_res = cloudinary.uploader.rename(
                    project.title, title)
                project.title = title
                project.cover_image_url = rename_cover_image_res.get(
                    'secure_url')

            if description:
                project.description = description

            if repo_url:
                project.repo_url = repo_url

            if url:
                project.url = url

            db.session.commit()

            return {
                STATUS_KEY: STATUS_SUCCESS,
                DATA_KEY: {
                    'project': project.get_project_response()
                }
            }, 201
        except Exception as exception:
            return {
                STATUS_KEY: STATUS_FAILURE,
                DATA_KEY: {
                    MESSAGES_KEY: [str(exception)]
                }
            }, 500

    @auth_required
    def delete(admin, self, project_uid):
        admin_uid = admin.uid

        try:
            project = Project.query.filter_by(uid=project_uid).first()

            if not project:
                return {
                    STATUS_KEY: STATUS_FAILURE,
                    DATA_KEY: {
                        MESSAGES_KEY: [PROJECT_NOT_FOUND]
                    }
                }, 400

            if project.admin_uid != admin_uid:
                return {
                    STATUS_KEY: STATUS_FAILURE,
                    DATA_KEY: {
                        MESSAGES_KEY: [NOT_AUTHORIZED]
                    }
                }, 401

            delete_cover_image_res = cloudinary.uploader.destroy(project.title)

            if delete_cover_image_res.get('result') == COVER_IMAGE_DELETED_OK:
                Project.query.filter_by(uid=project_uid).delete()
                db.session.commit()

            return {
                STATUS_KEY: STATUS_SUCCESS,
                DATA_KEY: {
                    MESSAGES_KEY: [PROJECT_DELETED]
                }
            }, 200
        except Exception as exception:
            return {
                STATUS_KEY: STATUS_FAILURE,
                DATA_KEY: {
                    MESSAGES_KEY: [str(exception)]
                }
            }, 500


class ProjectUploadResource(Resource):
    @auth_required
    def patch(admin, self, project_uid):
        args = project_update_parser.parse_args()
        cover_image = args.get('cover_image')
        admin_uid = admin.uid

        error_messages = []

        if not cover_image:
            error_messages.append(COVER_IMAGE_REQUIRED)

        if len(error_messages):
            return {
                STATUS_KEY: STATUS_FAILURE,
                DATA_KEY: {
                    MESSAGES_KEY: error_messages
                }
            }, 400

        try:
            project = Project.query.filter_by(uid=project_uid).first()

            if not project:
                return {
                    STATUS_KEY: STATUS_FAILURE,
                    DATA_KEY: {
                        MESSAGES_KEY: [PROJECT_NOT_FOUND]
                    }
                }, 400

            if project.admin_uid != admin_uid:
                return {
                    STATUS_KEY: STATUS_FAILURE,
                    DATA_KEY: {
                        MESSAGES_KEY: [NOT_AUTHORIZED]
                    }
                }, 401

            if not cover_image:
                return {
                    STATUS_KEY: STATUS_FAILURE,
                    DATA_KEY: {
                        MESSAGES_KEY: [COVER_IMAGE_REQUIRED]
                    }
                }, 400

            if cover_image:
                cloudinary.uploader.upload_resource(
                    cover_image, public_id=project.title, unique_filename=False, overwrite=True)

                cover_image_url = cloudinary.CloudinaryImage(
                    project.title).build_url()
                project.cover_image_url = cover_image_url

            db.session.commit()

            return {
                STATUS_KEY: STATUS_SUCCESS,
                DATA_KEY: {
                    'project': project.get_project_response()
                }
            }, 201
        except Exception as exception:
            return {
                STATUS_KEY: STATUS_FAILURE,
                DATA_KEY: {
                    MESSAGES_KEY: [str(exception)]
                }
            }, 500
