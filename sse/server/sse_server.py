from flask import Flask, Response
import os
import praw

reddit = praw.Reddit(
    client_id=os.environ['REDDIT_ID'],
    client_secret=os.environ['REDDIT_SECRET'],
    password=os.environ['REDDIT_PASS'],
    user_agent="script by u/vsaraph",
    username="vsaraph"
)

subreddit = reddit.subreddit("news")

app = Flask(__name__)

@app.route("/stream")
def stream():
    def eventStream():
        for comment in subreddit.stream.comments(skip_existing=True):
            yield comment.body
    
    return Response(eventStream(), mimetype="text/event-stream")

app.run(host="0.0.0.0")