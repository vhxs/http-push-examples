
import asyncio
import websockets
import praw
import os

reddit = praw.Reddit(
    client_id=os.environ['REDDIT_ID'],
    client_secret=os.environ['REDDIT_SECRET'],
    password=os.environ['REDDIT_PASS'],
    user_agent="script by u/vsaraph",
    username="vsaraph"
)

subreddit = reddit.subreddit("news")

async def push(websocket):
    for comment in subreddit.stream.comments(skip_existing=True):
        await websocket.send(comment.body)

start_server = websockets.serve(push, "localhost", 8765, ping_interval=None)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()