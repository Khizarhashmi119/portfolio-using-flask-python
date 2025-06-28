import os

# ENV variables
SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI')
SECRET_KEY = os.getenv('SECRET_KEY')

# Regular expressions
email_regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

# Keys
STATUS_KEY = 'status'
DATA_KEY = 'data'
MESSAGES_KEY = 'messages'

# Response statuses
STATUS_SUCCESS = 'success'
STATUS_FAILURE = 'failure'
COVER_IMAGE_DELETED_OK = 'ok'

# Function return status
TOKEN_DECODED = 'TOKEN_DECODED'
TOKEN_EXPIRED = 'TOKEN_EXPIRED'
TOKEN_INVALID = 'TOKEN_INVALID'

# Response messages
EMAIL_REQUIRED = 'email is required.'
PASSWORD_REQUIRED = 'password is required.'
FIRST_NAME_REQUIRED = 'first_name is required.'
LAST_NAME_REQUIRED = 'last_name is required.'
TITLE_REQUIRED = 'title is required.'
DESCRIPTION_REQUIRED = 'description is required.'
SKILL_NAME_REQUIRED = 'skill_name is required.'
COVER_IMAGE_REQUIRED = 'cover_image is required.'
INTERNAL_SERVER_ERROR = 'Internal server error.'
INVALID_EMAIL_ID = 'Invalid email id.'
EMAIL_ID_ALREADY_EXISTS = 'Email id already exist.'
INVALID_CREDENTIALS = 'Invalid credentials.'
PROJECT_NOT_FOUND = 'Project not found.'
PROJECT_DELETED = 'Project successfully deleted.'
TOKEN_NOT_FOUND = 'Token not found. Authorization failed.'
TOKEN_EXPIRED = 'Token expired. Please log in again.'
INVALID_TOKEN = 'Invalid token. Please log in again.'
SKILL_NOT_FOUND = 'Skill not found.'
SKILL_DELETED = 'Skill successfully deleted.'
NOT_AUTHORIZED = 'Not authorized.'
SKILL_ADDED_TO_PROJECT = 'Skill successfully added to the project.'
SKILL_REMOVED_FROM_PROJECT = 'Skill successfully removed from the project.'

# Others
PASSWORD_WRITE_ONLY = 'Password is write only.'