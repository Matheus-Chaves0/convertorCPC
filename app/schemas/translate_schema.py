from marshmallow import Schema, fields, validate, ValidationError

class TranslateSchema(Schema):
    texto = fields.Str(required=True, validate=validate.Length(min=2))
    direcao = fields.Str(required=True, validate=validate.OneOf(["nl_to_cpc", "cpc_to_nl"]))
