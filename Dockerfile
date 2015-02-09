# DOCKER-VERSION 0.7.1
FROM      ubuntu:14.04
MAINTAINER Jérémy Morin <jer.morin@free.fr>

RUN echo "deb http://archive.ubuntu.com/ubuntu trusty main universe" > /etc/apt/sources.list
RUN apt-get -y update

RUN DEBIAN_FRONTEND=noninteractive apt-get install -y -q python-software-properties software-properties-common
RUN apt-get -y install openssh-server && mkdir /var/run/sshd

# install oracle java from PPA
RUN add-apt-repository ppa:webupd8team/java -y
RUN apt-get update
RUN echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections
RUN apt-get -y install oracle-java8-installer && apt-get clean

# Install and java back-end depencies
RUN update-java-alternatives -s java-8-oracle
RUN echo "export JAVA_HOME=/usr/lib/jvm/java-8-oracle" >> ~/.bashrc
RUN apt-get -y install vim git sudo zip bzip2 fontconfig curl
RUN apt-get -y install maven

RUN add-apt-repository ppa:chris-lea/node.js -y
RUN apt-get update -y
RUN apt-get install nodejs -y

#install database
RUN apt-get -y install mysql-server
RUN dpkg-divert --local --rename --add /sbin/initctl

# configure the "miagebdx" and "root" users
RUN echo 'root:miagebdx' |chpasswd
RUN groupadd miagebdx && useradd miagebdx -s /bin/bash -m -g miagebdx -G miagebdx && adduser miagebdx sudo
RUN echo 'miagebdx:miagebdx' |chpasswd

#Install nodejs and dependencies
RUN npm install npm -g
RUN npm install yo -g
RUN npm install bower -g
RUN npm --unsafe-perm install generator-jhipster -g

#Clone context in image context
RUN cd /home && mkdir website 
ADD . /home/website
RUN cd /home/website && npm install
RUN cd /home && chown -R miagebdx:miagebdx /home/website
RUN cd /home/website && sudo -u miagebdx mvn dependency:go-offline

#Launch database
CMD ["/usr/bin/mysqld_safe"]
RUN mvn -Pprod spring-boot:run

# expose the working directory, the Tomcat port, the Grunt server port, the SSHD port, and run SSHD
VOLUME ["/miagebdx"]
EXPOSE 8080
EXPOSE 9000
EXPOSE 22
CMD    /usr/sbin/sshd -D
