#from celery.decorators import task
#from celery.utils.log import get_task_logger
from ola.celery import app

#logger = get_task_logger(__name__)


@app.task(name="send_feedback_email_task")
def send_feedback_email_task():
    """sends an email when feedback form is filled successfully"""
    #logger.info("Sent feedback email")
    return 3
