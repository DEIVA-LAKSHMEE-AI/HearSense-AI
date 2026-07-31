import pandas as pd
import joblib
from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report

from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.tree import DecisionTreeClassifier

# ======================================================
# Load Dataset
# ======================================================

BASE_DIR = Path(__file__).resolve().parent

DATASET = BASE_DIR / "dataset" / "hearsense_dataset.xlsx"
MODEL_DIR = BASE_DIR / "models"

MODEL_DIR.mkdir(exist_ok=True)

df = pd.read_excel(DATASET)

print(df.head())

# ======================================================
# Features
# ======================================================

FEATURES = [
    "Age",
    "R250","R500","R1000","R2000","R4000","R8000",
    "L250","L500","L1000","L2000","L4000","L8000"
]

X = df[FEATURES]

targets = {
    "Diagnosis":"diagnosis_model.pkl",
    "Severity":"severity_model.pkl",
    "Pattern":"pattern_model.pkl"
}

models = {
    "RandomForest": RandomForestClassifier(
        n_estimators=300,
        random_state=42
    ),
    "GradientBoosting": GradientBoostingClassifier(random_state=42),
    "DecisionTree": DecisionTreeClassifier(random_state=42)
}

for target, model_name in targets.items():

    print("="*70)
    print("Training:", target)

    encoder = LabelEncoder()

    y = encoder.fit_transform(df[target])

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

    best_acc = 0
    best_model = None

    for name, model in models.items():

        model.fit(X_train, y_train)

        pred = model.predict(X_test)

        acc = accuracy_score(y_test, pred)

        print(f"{name}: {acc:.4f}")

        if acc > best_acc:
            best_acc = acc
            best_model = model

    print("\nBest Accuracy:", best_acc)

    pred = best_model.predict(X_test)

    print(classification_report(y_test, pred))

    joblib.dump(best_model, MODEL_DIR / model_name)

    joblib.dump(
        encoder,
        MODEL_DIR / f"{target.lower()}_encoder.pkl"
    )

print("\n==============================")
print("Training Completed Successfully")
print("==============================")