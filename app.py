from flask import Flask, render_template, request
import joblib
import pandas as pd

app = Flask(__name__)

# ==============================
# Load Model and Encoders
# ==============================

model = joblib.load("models/credit_model.pkl")
encoders = joblib.load("models/encoders.pkl")


# ==============================
# Home Page
# ==============================

@app.route("/")
def home():
    return render_template("index.html")


# ==============================
# Prediction
# ==============================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        # -------------------------
        # Get User Input
        # -------------------------

        age = int(request.form["Age"])
        income = float(request.form["Annual_Income"])
        score = int(request.form["Credit_Score"])
        emp = int(request.form["Employment_Years"])

        education = request.form["Education_Level"]
        marital = request.form["Marital_Status"]

        dependents = int(request.form["Number_of_Dependents"])
        months = int(request.form["Months_at_Address"])

        home = request.form["Home_Ownership"]

        credit_lines = int(request.form["Total_Credit_Lines"])

        utilization = float(request.form["Credit_Utilization"])

        dti = float(request.form["Debt_to_Income_Ratio"])

        defaults = int(request.form["Prior_Defaults"])

        # -------------------------
        # Encode Categorical Values
        # -------------------------

        education = encoders["Education_Level"].transform([education])[0]

        marital = encoders["Marital_Status"].transform([marital])[0]

        home = encoders["Home_Ownership"].transform([home])[0]

        # -------------------------
        # Create DataFrame
        # -------------------------

        data = pd.DataFrame([[

            age,
            income,
            score,
            emp,
            education,
            marital,
            dependents,
            months,
            home,
            credit_lines,
            utilization,
            dti,
            defaults

        ]],

        columns=[

            "Age",
            "Annual_Income",
            "Credit_Score",
            "Employment_Years",
            "Education_Level",
            "Marital_Status",
            "Number_of_Dependents",
            "Months_at_Address",
            "Home_Ownership",
            "Total_Credit_Lines",
            "Credit_Utilization",
            "Debt_to_Income_Ratio",
            "Prior_Defaults"

        ])

        # -------------------------
        # Prediction
        # -------------------------

        prediction = model.predict(data)[0]

        probability = model.predict_proba(data)[0]

        approved_prob = round(probability[1] * 100, 2)

        rejected_prob = round(probability[0] * 100, 2)

        # -------------------------
        # Result
        # -------------------------

        if prediction == 1:

            result = "APPLICATION APPROVED"

        else:

            result = "APPLICATION REJECTED"

        # -------------------------
        # Reasons
        # -------------------------

        reasons = []

        if score < 650:
            reasons.append("Credit Score is below the recommended value.")

        if income < 300000:
            reasons.append("Annual Income is comparatively low.")

        if emp < 2:
            reasons.append("Employment experience is less than 2 years.")

        if utilization > 80:
            reasons.append("Credit Utilization is very high.")

        if dti > 40:
            reasons.append("Debt-to-Income Ratio is high.")

        if defaults > 0:
            reasons.append("Previous Credit Defaults found.")

        if credit_lines < 2:
            reasons.append("Very few credit lines available.")

        if months < 12:
            reasons.append("Residential stability is low.")

        if prediction == 0 and len(reasons) == 0:
            reasons.append(
                "The Machine Learning model detected multiple financial risk factors."
            )

        # -------------------------
        # Render Result Page
        # -------------------------

        return render_template(

            "result.html",

            prediction=result,

            approved_prob=approved_prob,

            rejected_prob=rejected_prob,

            reasons=reasons,

            age=age,

            income=income,

            score=score,

            emp=emp,

            dependents=dependents,

            months=months,

            credit_lines=credit_lines,

            utilization=utilization,

            dti=dti,

            defaults=defaults

        )

    except Exception as e:

        return f"<h2>Error:</h2><br>{e}"


# ==============================
# Run Flask
# ==============================

if __name__ == "__main__":

    app.run(debug=True)