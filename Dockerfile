FROM library/ubuntu:14.04

MAINTAINER n4sjamk

RUN apt-get update && apt-get install -y software-properties-common build-essential python
RUN add-apt-repository ppa:chris-lea/node.js
RUN apt-get update && apt-get install -y nodejs phantomjs

RUN ["useradd", "-m", "teamboard", "-u", "23456"]

ADD . /home/teamboard/teamboard-img

RUN chown -R teamboard:teamboard /home/teamboard/teamboard-img

USER teamboard

RUN cd /home/teamboard/teamboard-img && \
	npm install

CMD /usr/bin/node /home/teamboard/teamboard-img/index.js
