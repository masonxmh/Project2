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
China_realtime = Base.classes.Great_China

# Create our session (link) from Python to the DB
session = Session(engine)

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
    """Return a list of summary names and counts."""

    
    results = session.query(summary.Count,summary.Total).all()
    session.close()
        
    return jsonify(list(results))

# define China map features
@app.route("/map/china")
def map():
    """Return a list of summary names and counts."""
    # map info
    sel = [
        China_realtime.Provinces,
        China_realtime.confirmedCount,
        China_realtime.suspectedCount,
        China_realtime.curedCount,
        China_realtime.deadCount,
        China_realtime.country,
        China_realtime.lat,
        China_realtime.lng
    ]
    results = session.query(*sel).all()

    c = []
    for x in results:
        jsonChina = {}
        jsonChina["Provinces"] = x[0]
        jsonChina["confirmed"] = x[1]
        jsonChina["suspected"] = x[2]
        jsonChina["cured"] = x[3]
        jsonChina["dead"] = x[4]
        jsonChina["country"] = x[5]
        jsonChina["location"] = [x[6],x[7]]
        c.append(jsonChina)
        
        session.close()

    return jsonify(list(c))







if __name__ == '__main__':
    app.run(debug=True)