########### Flask Application ##################
# Dependencies and Setup
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from collections import defaultdict
from flask import Flask, jsonify, render_template
# from flask_sqlalchemy import SQLAlchemy
import pandas as pd


# Flask Setup
#################################################
app = Flask(__name__)
#################################################
# Database Setup
#################################################
##app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///wuhan_pneumonia.sqlite"

engine = create_engine("sqlite:///wuhan_pneumonia.sqlite")
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

summary = Base.classes.summary


# Create our session (link) from Python to the DB


#################################################


#################################################
# Flask Routes
#################################################
@app.route("/")
def home():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/test")
def test():
    """Return a list of sample names."""

    session = Session(engine)
    results = session.query(summary.Count,summary.Total).all()
    session.close()
        
    return jsonify(list(results))






if __name__ == '__main__':
    app.run(debug=True)