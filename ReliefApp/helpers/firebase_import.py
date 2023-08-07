import firebase_admin
from firebase_admin import credentials, firestore
import json

# Firebase Admin SDK file
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

json_file_path = "maras_random_dataset.json"
with open(json_file_path, "r") as file:
    data = json.load(file)

db = firestore.client()

# add to "needs" or "donations" collection 
collection_ref = db.collection("needs")

""" # to delete my added random needs / donations with the name demo@gmail.com
query = collection_ref.where("name", "==", "demo@gmail.com")
results = query.get()
for doc in results:
    doc.reference.delete() """

#to add entries to firebase table
i = 0
for entry in data:
    print("working on entr", i)
    collection_ref.add(entry)
    i = i+1
