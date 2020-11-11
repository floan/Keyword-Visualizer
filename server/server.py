from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
import pickle
import json

def binarySearch(wrd, allWords): #This is log(n) compared to *in* operator which is O(n) 
    low = 0
    high = len(allWords) - 1
    mid = 0

    while low <= high: 
        mid = (high + low) // 2
        if allWords[mid] < wrd: 
            low = mid + 1
        elif allWords[mid] > wrd: 
            high = mid - 1
        else: 
            return True #Word is in list 
    return False #Word is not in list

def generateData():
    data = {}
    with open('stop_word_data.pickle', 'rb') as f: 
        data = pickle.load(f)
    return data #Object with the first element ID and second element a list of stopWords


def updateData(data):
    pickle.dump(data, open('stop_word_data.pickle', 'wb')) #Will only ever change the ID, rest of the data is the same

def storeProcessedData(my_id, listOfData):
    outF = open(str(my_id) + '.pickle', 'w') #Create the new output file
    outF.close()
    pickle.dump(listOfData, open(str(my_id) + '.pickle', 'wb')) #Dump the list 

def getProcessedData(my_id):
    data = []
    with open(str(my_id) + '.pickle', 'rb') as f: 
        data = pickle.load(f)
    return data #Object with the first element ID and second element a list of stopWords



def processTranscript(strTranscript):
    dictWordFreq = {}
    lstWords = strTranscript.split() #Get a list of all the words
    data = generateData()
    data['id'] += 1 #This is an integer number of previous id + 1
    record_id = data['id']
    updateData(data)
    STOP_WORDS = data['stopWords'] #This is a list of all the stop_word strings 

    for word in lstWords: 
        if not (binarySearch(word, STOP_WORDS)): #If the word is not in stop words
            if word in dictWordFreq: 
                dictWordFreq[word] += 1
            else:
                dictWordFreq[word] = 1
        #If the word is in our stop words list, do nothing, keep iterating
    dictWordFreq = sorted(dictWordFreq.items(), key=lambda x:(x[1], x[0]), reverse=True) #Sort in descending order
    dictWordFreq = list(dictWordFreq)[:20] #Gets the top 20 keywords

    storeProcessedData(record_id, dictWordFreq) #Storing the data for later use

    return dictWordFreq, record_id


app = Flask('Keyword search server')
CORS(app)

@app.route('/get-data', methods=['GET'])
def get_mailbox_callback():
    my_id = request.args.get('id');
    #Get the list from a pickle file
    data = getProcessedData(my_id)
    #Convert the data to a response object
    response = {
        'data': data 
    }
    return json.dumps(response), 200

@app.route('/send-transcript', methods=['POST'])
def post_transcript_callback():
    """
    Summary: A callback for when POST is called on [host]:[port]/send-transcript
    Returns:
        string: A JSON-formatted string containing the response message
    """

    # Get the payload containing the sender, subject and body parameters
    payload = request.get_json(force=True) #We want the entire transcript string from here
    strTranscript = payload['transcript']
    #Function to process the data
    processedData, record_id = processTranscript(strTranscript)
    #Now send this processed data as a JSON response
    #TODO: Decide if you want to send this to a database as well. Assign a unique ID?

    response = {
        'data': processedData,
        'id': record_id
    }

    # The object returned will be sent back as an HTTP message to the requester
    return json.dumps(response), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)