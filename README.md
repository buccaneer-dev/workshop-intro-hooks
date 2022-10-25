# react-hooks-workshop

Single-page application for the Workshop *Guida pratica agli Hooks di React*

## Setup client


```
git clone https://github.com/develer-staff/react-hooks-workshop.git

cd react-hooks-workshop/client

npm i

npm run start
```


NB: During the workshop a demo server will be available at the IP address hard-coded in the library client, if you are *reading from the future* replace that string to http://localhost:8080/ and follow the **setup server step**


## Exercises

To follow along with the exercises checkout the different branches and complete the tasks of the latest commit described in the comments

### Part 1 - useState


```
git checkout part-1-usestate
```

### Part 2 - useEffect


```
git checkout part-2-useeffect
```

### Part 3 - useEffect cleanup


```
git checkout part-3-useeffect-cleanup
```

### Part 4 - useContext


```
git checkout part-4-usecontext
```

### Part 5 - final


```
git checkout part-5-final-extra
```

## Setup server

Running a local server (optional for the Workshop)

```

cd react-hooks-workshop/server

npm i

npm run dev
```

Configure the API URL to localhost in *./client/src/library_client/LibraryClient.js*

```
const API_URL = "http://localhost:8080/";
```
## I want more

We recorded a webinar where we give an Introduction to React Hooks and delve into the difference between using class-based and functional components

[![IMAGE_ALT](https://img.youtube.com/vi/rdtDgXZ0n7s/0.jpg)](https://www.youtube.com/watch?v=rdtDgXZ0n7s)
