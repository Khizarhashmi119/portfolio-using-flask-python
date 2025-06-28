from flask_restful import reqparse
from werkzeug.datastructures import FileStorage

project_get_parser = reqparse.RequestParser(trim=True)
project_get_parser.add_argument('limit', type=int, location="args")
project_get_parser.add_argument('offset', type=int, location="args")

project_create_parser = reqparse.RequestParser(trim=True)
project_create_parser.add_argument('title', type=str, location='form')
project_create_parser.add_argument('description', type=str, location='form')
project_create_parser.add_argument('repo_url', type=str, location='form')
project_create_parser.add_argument('url', type=str, location='form')
project_create_parser.add_argument(
    'cover_image', type=FileStorage, location='files')

project_update_parser = reqparse.RequestParser(trim=True)
project_update_parser.add_argument('title', type=str, location='form')
project_update_parser.add_argument('description', type=str, location='form')
project_update_parser.add_argument('repo_url', type=str, location='form')
project_update_parser.add_argument('url', type=str, location='form')
project_update_parser.add_argument(
    'cover_image', type=FileStorage, location='files')
