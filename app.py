########### Flask Application ##################
# Dependencies and Setup
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from collections import defaultdict
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
# from flask_sqlalchemy import SQLAlchemy
import pandas as pd
##################Jessica############################
import dash
import dash_core_components as dcc
import dash_html_components as html
from datetime import datetime


# Flask Setup
#################################################
app = Flask(__name__)
# app.config['JSON_SORT_KEYS'] = False ---Vicky
#################################################
# Database Setup
#################################################
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///wuhan_pneumonia.sqlite"

engine = create_engine("sqlite:///wuhan_pneumonia.sqlite")
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

#Mason
summary = Base.classes.summary
China_realtime = Base.classes.Great_China
world_realtime = Base.classes.world
world_China_realtime = Base.classes.world_China
#Vicky
china_current = Base.classes.China_current_final
death_sex = Base.classes.Sex_Death
#Jessica
confirmed = Base.classes.China_confirmed
death = Base.classes.China_deathes
recovered = Base.classes.China_recovered
new_confirmed = Base.classes.China_new_confirmed
new_death =Base.classes.China_new_deathes
new_recovered = Base.classes.China_new_recovered

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

@app.route("/index.html")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/china.html")
def china():
    return render_template("china.html")


@app.route("/current_china.html")
def current_china():
    return render_template("current_china.html")

@app.route("/death_age.html")
def death_age():
    return render_template("death_age.html")

@app.route("/forecast.html")
def forecast():
    return render_template("forecast.html")


########################Vicky#############################################
@app.route("/china/current")
def current():
    """Return a list of China situation data"""

    session = Session(engine)

    sel = [
        china_current.Date,
        china_current.Province,
        china_current.Country,
        china_current.Confirmed,
        china_current.NewConfirmed,
        china_current.Death,
        china_current.NewDeath,
        china_current.Recovered,
        china_current.NewRecorvered
    ]
    results = session.query(*sel).order_by(china_current.Confirmed.desc()).all()

    cur = []
    for x in results:
        json_china_current = {}

        json_china_current["Date"] = x[0]
        json_china_current["Province"] = x[1]
        json_china_current["Country"] = x[2]
        json_china_current["Confirmed"] = x[3]
        json_china_current["NewConfirmed"] = x[4]
        json_china_current["Death"] = x[5]
        json_china_current["NewDeath"] = x[6]
        json_china_current["Recovered"] = x[7]
        json_china_current["NewRecovered"] = x[8]


        cur.append(json_china_current)
        
        session.close()

    return jsonify(list(cur))

@app.route("/china/death/dex")
def deadthsex():
    """Return a list of China situation data"""

    session = Session(engine)
    # map info
    sel = [
        death_sex.Age,
        death_sex.Female,
        death_sex.Female_death,
        death_sex.Male,
        death_sex.Male_death,
        death_sex.Total_death
    ]
    results = session.query(*sel).all()

    deathsex= []
    for x in results:

        json_sex_death= {}
        json_sex_death["Age"] = x[0]
        json_sex_death["Female"] = x[1]
        json_sex_death["Female_death"] = x[2]
        json_sex_death["Male"] = x[3]
        json_sex_death["Male_death"] = x[4]
        json_sex_death["Total_death"] = x[5]

        deathsex.append(json_sex_death)

        session.close()

    return jsonify(list(deathsex))
#####################Jessica#####################################################
@app.route("/China_Data")
def final_list():
    session = Session(engine)
    def dfconvertion(table):
        session = Session(engine)
        data=[]
        for i in session.query(table).all():
            data.append(i.__dict__)
        df = pd.DataFrame(data).set_index("Date").transpose()[1:]
        df.index.name = "Province"
        session.close()
        return df
    
    def factor_list(df):
        session = Session(engine)
        d={}
        for i in dfconvertion(confirmed).index.to_list():
            df_dict =df[df.index ==i].transpose().to_dict()[i].values()
            d={**d,**{str(i):list(df_dict)}}
            session.close()
        return d

    
    date=session.query(new_confirmed.Date).all()
    for d in range(len(date)):
        date[d]=date[d][0].date().strftime("%Y-%m-%d")

    session.close()
    return jsonify([{"new_confirmed":factor_list(dfconvertion(new_confirmed)),
            "new_death":factor_list(dfconvertion(new_death)),
            "new_recovered":factor_list(dfconvertion(new_recovered)),
            "confirmed": factor_list(dfconvertion(confirmed)),
            "death":factor_list(dfconvertion(death)),
            "recovered":factor_list(dfconvertion(recovered)),
            "Date":date,
            "Province":dfconvertion(confirmed).index.to_list()}])
####################################Mason##############################################
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