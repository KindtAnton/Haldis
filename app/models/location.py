"Script for everything Location related in the database"
import typing

from models import db


class Location(db.Model):
    "Class used for configuring the Location model in the database"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(254))
    website = db.Column(db.String(120))
    telephone = db.Column(db.String(20), nullable=True)
    products = db.relationship("Product", backref="location", lazy="dynamic")
    orders = db.relationship("Order", backref="location", lazy="dynamic")

    def configure(self, name: str, address: str,
                  telephone: typing.Optional[str], website: str) -> None:
        "Configure the Location"
        self.name = name
        self.address = address
        self.website = website
        self.telephone = telephone

    def __repr__(self) -> str:
        return "%s" % (self.name)
