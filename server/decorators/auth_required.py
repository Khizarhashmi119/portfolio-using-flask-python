from functools import wraps


from constants import DATA_KEY, INTERNAL_SERVER_ERROR, INVALID_TOKEN,  MESSAGES_KEY, STATUS_FAILURE, STATUS_KEY, TOKEN_DECODED, TOKEN_EXPIRED, TOKEN_INVALID, TOKEN_NOT_FOUND
from models import Admin
from parsers.auth import auth_header_parser


def auth_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
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
            admin = Admin.query.filter_by(uid=result['admin_uid']).first()
            return func(admin, *args, **kwargs)
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

    return wrapper
