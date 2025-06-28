from flask_restful import Resource

from constants import DATA_KEY, MESSAGES_KEY, NOT_AUTHORIZED, PROJECT_NOT_FOUND, SKILL_ADDED_TO_PROJECT, SKILL_NOT_FOUND, STATUS_FAILURE, STATUS_KEY, STATUS_SUCCESS
from decorators.auth_required import auth_required
from models import db, Project, Skill


class ProjectSkillResource(Resource):
    @auth_required
    def patch(admin, self, project_uid, skill_uid):
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

            project.skills.append(skill)
            db.session.commit()

            return {
                STATUS_KEY: STATUS_SUCCESS,
                DATA_KEY: {
                    MESSAGES_KEY: [SKILL_ADDED_TO_PROJECT]
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
    def delete(admin, self, project_uid, skill_uid):
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

            project.skills.remove(skill)
            db.session.commit()

            return {
                STATUS_KEY: STATUS_SUCCESS,
                DATA_KEY: {
                    MESSAGES_KEY: [SKILL_ADDED_TO_PROJECT]
                }
            }, 200
        except Exception as exception:
            return {
                STATUS_KEY: STATUS_FAILURE,
                DATA_KEY: {
                    MESSAGES_KEY: [str(exception)]
                }
            }, 500
