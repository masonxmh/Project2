########### Flask Application ##################
# Dependencies and Setup
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from collections import defaultdict
from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///wuhan_pneumonia.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
Summary = Base.classes.summary
China_real = Base.classes.Great_China
World_real = Base.classes.World_real

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################
@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/summary")
def summary():
    """Return a list of sample names."""

    # Use Pandas to Perform SQL Query
    stmt = db.session.query(Samples).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Return a List of Column Names (Sample Names)
    return jsonify(list(df.columns)[2:])