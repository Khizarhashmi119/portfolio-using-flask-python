from flask_restful import Resource

from constants import DATA_KEY, MESSAGES_KEY, SKILL_NOT_FOUND, STATUS_FAILURE, STATUS_KEY, STATUS_SUCCESS
from models import Skill


class SkillProjectResource(Resource):
    def get(self, skill_uid):
        try:
            skill = Skill.query.filter_by(uid=skill_uid).first()

            if not skill:
                return {
                    STATUS_KEY: STATUS_FAILURE,
                    DATA_KEY: {
                        MESSAGES_KEY: [SKILL_NOT_FOUND]
                    }
                }, 400

            return {
                STATUS_KEY: STATUS_SUCCESS,
                DATA_KEY: {
                    'projects': [project.get_skill_project_response()
                                  for project in skill.projects]
                }
            }, 200
        except Exception as exception:
            return {
                STATUS_KEY: STATUS_FAILURE,
                DATA_KEY: {
                    MESSAGES_KEY: [str(exception)]
                }
            }, 500
