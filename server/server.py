from config import app, api
from resources.auth import AuthLoginResource, AuthSignUpResource, AuthValidation
from resources.projects import ProjectResource, ProjectsResource, ProjectUploadResource
from resources.project_skill import ProjectSkillResource
from resources.skill_project import SkillProjectResource
from resources.skills import SkillResource, SkillsResource

api.add_resource(AuthSignUpResource, '/auth/sign-up')
api.add_resource(AuthLoginResource, '/auth/login')
api.add_resource(AuthValidation, '/auth/validate')
api.add_resource(ProjectsResource, '/projects')
api.add_resource(ProjectResource, '/projects/<string:project_uid>')
api.add_resource(ProjectUploadResource,
                 '/projects/<string:project_uid>/upload')
api.add_resource(ProjectSkillResource,
                 '/projects/<string:project_uid>/skills/<string:skill_uid>')
api.add_resource(SkillsResource, '/skills')
api.add_resource(SkillResource, '/skills/<string:skill_uid>')
api.add_resource(SkillProjectResource, '/skills/<string:skill_uid>/projects')

# GET /auth/validate 👍
# GET /projects 👍
# GET /skills 👍
# GET /skills/<skill_uid>/projects 👍
# POST /auth/sign-up 👍
# POST /auth/login 👍
# POST /projects 👍
# POST /skills 👍
# PATCH /projects/<project_uid> 👍
# PATCH /projects/<project_uid>/upload 👍
# PATCH /projects/<project_uid>/skill 😵
# DELETE /projects/<project_uid>/skill 😵
# DELETE /projects/<project_uid> 👍
# DELETE /skill/<skill_uid> 👍

if __name__ == '__main__':
    app.run()
