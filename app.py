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
world_realtime = Base.classes.world
world_China_realtime = Base.classes.world_China

# table_China_realtime = Base.classes.Great_China
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
    session = Session(engine)
    sel = [
        
        summary.confirmedCount,
        summary.suspectedCount,
        summary.deadCount,
        summary.curedCount
    ]

    results = session.query(*sel).all()
    session.close()
        
    return jsonify(list(results))

# define China map features
@app.route("/map/china")
def mapc():
    """Return a list of China situation data"""
    session = Session(engine)
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


# define country map other than China features
@app.route("/map/world")
def mapw():
    """Return a list of other counties situations data"""
    session = Session(engine)
    # map info
    sel = [
        world_realtime.Country,
        world_realtime.Continent,
        world_realtime.confirmedCount,
        world_realtime.suspectedCount,
        world_realtime.curedCount,
        world_realtime.deadCount,
        world_realtime.latitude,
        world_realtime.longitude
    ]
    results = session.query(*sel).all()

    w = []
    for x in results:
        jsonWorld = {}
        jsonWorld["country"] = x[0]
        jsonWorld["continent"] = x[1]
        jsonWorld["confirmed"] = x[2]
        jsonWorld["suspected"] = x[3]
        jsonWorld["cured"] = x[4]
        jsonWorld["dead"] = x[5]
        jsonWorld["location"] = [x[6],x[7]]
        w.append(jsonWorld)
        
        session.close()

    return jsonify(list(w))


# define table other than China
@app.route("/map/worldtable")
def table_world():
    """Return a list of world data"""
    session = Session(engine)
    # map info
    sel = [
        world_realtime.Country,
        world_realtime.confirmedCount,
        world_realtime.suspectedCount,
        world_realtime.curedCount,
        world_realtime.deadCount,
    ]
    results = session.query(*sel).order_by(world_realtime.confirmedCount.desc()).all()

    tw = []
    for x in results:
        table = {}
        table["Provinces"] = x[0]
        table["confirmed"] = x[1]
        table["suspected"] = x[2]
        table["cured"] = x[3]
        table["dead"] = x[4]
        tw.append(table)
        
        session.close()

    return jsonify(list(tw))

# define world List (include Greater China)
@app.route("/map/worldlist")
def table_worldlist():
    """Return a list of world data"""
    session = Session(engine)
    # map info
    sel = [
        world_China_realtime.Country,
        world_China_realtime.Countryshort,
        world_China_realtime.confirmedCount,
        world_China_realtime.suspectedCount,
        world_China_realtime.curedCount,
        world_China_realtime.deadCount,
    ]
    results = session.query(*sel).order_by(world_China_realtime.confirmedCount.desc()).all()

    wcList = []
    for x in results:
        table = {}
        table["country"] = x[0]
        table["countryShort"] = x[1]
        table["confirmed"] = x[2]
        table["suspected"] = x[3]
        table["cured"] = x[4]
        table["dead"] = x[5]
        wcList.append(table)
        
        session.close()

    return jsonify(list(wcList))


# define world List (Greater China)
@app.route("/map/greaterChinalist")
def table_greaterChinalist():
    """Return a list of greater China data"""
    session = Session(engine)
    # map info
    sel = [
            China_realtime.Provinces,
            China_realtime.confirmedCount,
            China_realtime.suspectedCount,
            China_realtime.curedCount,
            China_realtime.deadCount,
    ]
    results = session.query(*sel).order_by(China_realtime.confirmedCount.desc()).all()

    cpList = []
    for x in results:
        table = {}
        table["province"] = x[0]
        table["confirmed"] = x[1]
        table["suspected"] = x[2]
        table["dead"] = x[3]
        table["cured"] = x[4]
        cpList.append(table)
        
        session.close()

    return jsonify(list(cpList))

if __name__ == '__main__':
    app.run(debug=True)