from flask_restful import reqparse

auth_login_parser = reqparse.RequestParser(trim=True)
auth_login_parser.add_argument('email', type=str)
auth_login_parser.add_argument('password', type=str)

auth_sign_up_parser = reqparse.RequestParser(trim=True)
auth_sign_up_parser.add_argument('email', type=str)
auth_sign_up_parser.add_argument('password', type=str)
auth_sign_up_parser.add_argument('first_name', type=str)
auth_sign_up_parser.add_argument('last_name', type=str)

auth_header_parser = reqparse.RequestParser(trim=True)
auth_header_parser.add_argument('Authorization', type=str, location='headers')
