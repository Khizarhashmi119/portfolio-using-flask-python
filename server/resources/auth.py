
from flask_restful import Resource

from parsers.auth import auth_header_parser, auth_login_parser, auth_sign_up_parser
from constants import DATA_KEY, EMAIL_ID_ALREADY_EXISTS, EMAIL_REQUIRED, FIRST_NAME_REQUIRED, INTERNAL_SERVER_ERROR, INVALID_CREDENTIALS, INVALID_EMAIL_ID, INVALID_TOKEN, LAST_NAME_REQUIRED,  MESSAGES_KEY, PASSWORD_REQUIRED, STATUS_FAILURE, STATUS_KEY, STATUS_SUCCESS, TOKEN_DECODED, TOKEN_EXPIRED, TOKEN_INVALID, TOKEN_NOT_FOUND
from models import Admin, db


class AuthSignUpResource(Resource):
    def post(self):
        args = auth_sign_up_parser.parse_args()
        first_name = args.get('first_name')
        last_name = args.get('last_name')
        email = args.get('email')
        password = args.get('password')

        error_messages = []

        if not first_name:
            error_messages.append(FIRST_NAME_REQUIRED)
        if not last_name:
            error_messages.append(LAST_NAME_REQUIRED)
        if not email:
            error_messages.append(EMAIL_REQUIRED)
        if not password:
            error_messages.append(PASSWORD_REQUIRED)

        if len(error_messages):
            return {
                STATUS_KEY: STATUS_FAILURE,
                DATA_KEY: {
                    MESSAGES_KEY: error_messages
                }
            }, 400

        if (not Admin.validate_email(email)):
            return {
                STATUS_KEY: STATUS_FAILURE,
                DATA_KEY: {
                    MESSAGES_KEY: [INVALID_EMAIL_ID]
                }
            }, 400

        try:
            admin = Admin.query.filter_by(email=email).first()

            if admin:
                return {
                    STATUS_KEY: STATUS_FAILURE,
                    DATA_KEY: {
                        MESSAGES_KEY: [EMAIL_ID_ALREADY_EXISTS]
                    }
                }, 400

            admin = Admin(first_name, last_name, email, password)
            db.session.add(admin)
            db.session.commit()

            token = admin.encode_token()

            return {
                STATUS_KEY: STATUS_SUCCESS,
                DATA_KEY: {
                    'admin': admin.get_admin_response(),
                    'access_token': token
                }
            }, 201
        except Exception as exception:
            return {
                STATUS_KEY: STATUS_FAILURE,
                DATA_KEY: {
                    MESSAGES_KEY: [str(exception)]
                }
            }, 500


class AuthLoginResource(Resource):
    def post(self):
        args = auth_login_parser.parse_args()
        email = args.get('email')
        password = args.get('password')

        error_messages = []

        if not email:
            error_messages.append(EMAIL_REQUIRED)
        if not password:
            error_messages.append(PASSWORD_REQUIRED)

        if len(error_messages):
            return {
                STATUS_KEY: STATUS_FAILURE,
                DATA_KEY: {
                    MESSAGES_KEY: error_messages
                }
            }, 400

        if (not Admin.validate_email(email)):
            return {
                'status': STATUS_FAILURE,
                'data': {
                    'message': INVALID_EMAIL_ID
                }
            }, 400

        try:
            admin = Admin.query.filter_by(email=email).first()

            if not admin or not admin.check_password(password):
                return {
                    STATUS_KEY: STATUS_FAILURE,
                    DATA_KEY: {
                        MESSAGES_KEY: [INVALID_CREDENTIALS]
                    }
                }, 400

            token = admin.encode_token()

            return {
                STATUS_KEY: STATUS_SUCCESS,
                DATA_KEY: {
                    'admin': admin.get_admin_response(),
                    'access_token': token
                }
            }, 200
        except Exception as exception:
            return {
                STATUS_KEY: STATUS_FAILURE,
                DATA_KEY: {
                    MESSAGES_KEY: [str(exception)]
                }
            }, 500


class AuthValidation(Resource):
    def get(self):
        args = auth_header_parser.parse_args()
        token = args.get('Authorization')

        if not token:
            return {
                STATUS_KEY: STATUS_FAILURE,
                DATA_KEY: {
                    MESSAGES_KEY: [TOKEN_NOT_FOUND]
                }
            }, 401

        result = Admin.decode_token(token)

        if result[STATUS_KEY] == TOKEN_DECODED:
            try:
                admin = Admin.query.filter_by(uid=result['admin_uid']).first()

                return {
                    STATUS_KEY: STATUS_SUCCESS,
                    DATA_KEY: {
                        'admin': admin.get_admin_response(),
                    }
                }, 200
            except Exception as exception:
                return {
                    STATUS_KEY: STATUS_FAILURE,
                    DATA_KEY: {
                        MESSAGES_KEY: [str(exception)]
                    }
                }, 500
        elif result[STATUS_KEY] == TOKEN_EXPIRED:
            return {
                STATUS_KEY: STATUS_FAILURE,
                DATA_KEY: {
                    MESSAGES_KEY: [TOKEN_EXPIRED]
                }
            }, 401
        elif result[STATUS_KEY] == TOKEN_INVALID:
            return {
                STATUS_KEY: STATUS_FAILURE,
                DATA_KEY: {
                    MESSAGES_KEY: [INVALID_TOKEN]
                }
            }, 401
        else:
            return {
                STATUS_KEY: STATUS_FAILURE,
                DATA_KEY: {
                    MESSAGES_KEY: [INTERNAL_SERVER_ERROR]
                }
            }, 500
