
# <p align="center">`Instagram Tools`<p>
<div align="center">
    <img align="center" src=".github/assets/insta-tools.png" alt="MarineGEO circle logo" style="height: 200px; width:200px;"/>
    </div>
&nbsp;
    

> #### <span style="font-size: 1rem;">Instagram Tools Api written in NodeJs, on top of the [Nestjs](https://nestjs.com/) framework, integrated with a using Kafka microservice</span>

&nbsp;

---

&nbsp;

## <p >Technologies<p>

<ul>
  <li>NestJS</li>  
  <li >Docker</li>
  <li>PostgreSQL</li>
  <li>Prisma</li>
  <li>Kafka</li>
</ul>


&nbsp;


## <p >Getting Started<p>
### 1. Clone the repository on your machine and enter in folder **api**
#### <pre>git clone https://github.com/samuucavalcante/tools-instagram.git tools-instagram</pre>
#### <pre>cd tools-instagram/api</pre>
&nbsp;

### 2. Let's install the dependencies <code>run:</code>
#### <pre>npm install</pre>
#### <code>if you use yarn, run:</code>
#### <pre>yarn install</pre>
&nbsp;

### 3.Starting our environment <code>run:</code>
#### 
#### <pre>docker-compose up -d</pre>
&nbsp;

### 4. introspecting the database with prisma <code>run:</code>
#### <pre>npm run prisma db push</pre>
#### <code>if you use yarn run:</code>
#### <pre>yarn prisma db push</pre>

&nbsp;

> ### **Note:**  If you don't know what an introspect prism is, I recommend you read this article.
&nbsp;

### 5. NestJS Application startup <code>run</code>:
#### <pre>npm run start:dev</pre>
#### <code>if you use yarn run:</code>
#### <pre>yarn start:dev</pre>

