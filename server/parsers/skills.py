from flask_restful import reqparse


skill_get_parser = reqparse.RequestParser(trim=True)
skill_get_parser.add_argument('limit', type=int, location="args")
skill_get_parser.add_argument('offset', type=int, location="args")

skill_create_parser = reqparse.RequestParser(trim=True)
skill_create_parser.add_argument('skill_name', type=str)
