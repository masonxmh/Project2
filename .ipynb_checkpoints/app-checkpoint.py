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

    summary_result = session.query(Summary.Count, Summary.Total).all()
    session.close()

    # Return a List of Column Names (Sample Names)
    return jsonify(summary_result)






if __name__ == '__main__':
    app.run(debug=True)
