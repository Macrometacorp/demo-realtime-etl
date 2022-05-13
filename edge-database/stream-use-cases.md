## How to Run
**On Federation:**

> ```
> Create and publish following Stream Workers in your federation:
> 1. dup-Stream-publisher
> 2. dup-stream-deduplicator
> 3. fast-slow-stream-joiner
> 4. fast-stream-publisher
> 5. slow-stream-publisher
> 6. unordered-stream-processor
> 7. unordered-stream-publisher
> 
> ```

## Details

### Stream Workers


**dup-Stream-publisher:**
```
@App:name("dup-Stream-publisher")
@App:description("This app will produce 10 events (containing duplicates ) every 1 second")

define trigger dupStreamTrigger at every 1 sec;

-- Defines `dupStreamPublisher` stream to process events received from 'dupStreamTrigger' after every 5 seconds
@sink(type = 'c8streams', stream = "dupStreamPublisher")
define stream dupStreamPublisher (startTime long, rank string, firstname string, lastname string, city string);

-- 'eventTimestamp()' returns the timestamp of the processed/passed event.
select  eventTimestamp() as startTime,
        pii:fake(str:concat("title", convert(count()%3, 'string')), "NAME_TITLE") as rank, 
        pii:fake(str:concat("firstname", convert(count()%3, 'string')), "NAME_FIRSTNAME") as firstname, 
        pii:fake(str:concat("lastname", convert(count()%3, 'string')), "NAME_LASTNAME") as lastname, 
        pii:fake(str:concat("city", convert(count()%3, 'string')), "ADDRESS_CITY") as city
from dupStreamTrigger
insert into dupStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(convert(math:round(math:rand()*100+5000), 'string'), "NAME_TITLE") as rank, 
        pii:fake(convert(math:round(math:rand()*100+2000), 'string'), "NAME_FIRSTNAME") as firstname, 
        pii:fake(convert(math:round(math:rand()*100+3000), 'string'), "NAME_LASTNAME") as lastname, 
        pii:fake(convert(math:round(math:rand()*100+4000), 'string'), "ADDRESS_CITY") as city
from dupStreamTrigger
insert into dupStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(convert(math:round(math:rand()*100+5000), 'string'), "NAME_TITLE") as rank, 
        pii:fake(convert(math:round(math:rand()*100+2000), 'string'), "NAME_FIRSTNAME") as firstname, 
        pii:fake(convert(math:round(math:rand()*100+3000), 'string'), "NAME_LASTNAME") as lastname, 
        pii:fake(convert(math:round(math:rand()*100+4000), 'string'), "ADDRESS_CITY") as city
from dupStreamTrigger
insert into dupStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(convert(math:round(math:rand()*100+5000), 'string'), "NAME_TITLE") as rank, 
        pii:fake(convert(math:round(math:rand()*100+2000), 'string'), "NAME_FIRSTNAME") as firstname, 
        pii:fake(convert(math:round(math:rand()*100+3000), 'string'), "NAME_LASTNAME") as lastname, 
        pii:fake(convert(math:round(math:rand()*100+4000), 'string'), "ADDRESS_CITY") as city
from dupStreamTrigger
insert into dupStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(str:concat("title", convert(count()%3, 'string')), "NAME_TITLE") as rank, 
        pii:fake(str:concat("firstname", convert(count()%3, 'string')), "NAME_FIRSTNAME") as firstname, 
        pii:fake(str:concat("lastname", convert(count()%3, 'string')), "NAME_LASTNAME") as lastname, 
        pii:fake(str:concat("city", convert(count()%3, 'string')), "ADDRESS_CITY") as city
from dupStreamTrigger
insert into dupStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(convert(math:round(math:rand()*100+5000), 'string'), "NAME_TITLE") as rank, 
        pii:fake(convert(math:round(math:rand()*100+2000), 'string'), "NAME_FIRSTNAME") as firstname, 
        pii:fake(convert(math:round(math:rand()*100+3000), 'string'), "NAME_LASTNAME") as lastname, 
        pii:fake(convert(math:round(math:rand()*100+4000), 'string'), "ADDRESS_CITY") as city
from dupStreamTrigger
insert into dupStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(convert(math:round(math:rand()*100+5000), 'string'), "NAME_TITLE") as rank, 
        pii:fake(convert(math:round(math:rand()*100+2000), 'string'), "NAME_FIRSTNAME") as firstname, 
        pii:fake(convert(math:round(math:rand()*100+3000), 'string'), "NAME_LASTNAME") as lastname, 
        pii:fake(convert(math:round(math:rand()*100+4000), 'string'), "ADDRESS_CITY") as city
from dupStreamTrigger
insert into dupStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(convert(math:round(math:rand()*100+5000), 'string'), "NAME_TITLE") as rank, 
        pii:fake(convert(math:round(math:rand()*100+2000), 'string'), "NAME_FIRSTNAME") as firstname, 
        pii:fake(convert(math:round(math:rand()*100+3000), 'string'), "NAME_LASTNAME") as lastname, 
        pii:fake(convert(math:round(math:rand()*100+4000), 'string'), "ADDRESS_CITY") as city
from dupStreamTrigger
insert into dupStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(str:concat("title", convert(count()%3, 'string')), "NAME_TITLE") as rank, 
        pii:fake(str:concat("firstname", convert(count()%3, 'string')), "NAME_FIRSTNAME") as firstname, 
        pii:fake(str:concat("lastname", convert(count()%3, 'string')), "NAME_LASTNAME") as lastname, 
        pii:fake(str:concat("city", convert(count()%3, 'string')), "ADDRESS_CITY") as city
from dupStreamTrigger
insert into dupStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(convert(math:round(math:rand()*100+5000), 'string'), "NAME_TITLE") as rank, 
        pii:fake(convert(math:round(math:rand()*100+2000), 'string'), "NAME_FIRSTNAME") as firstname, 
        pii:fake(convert(math:round(math:rand()*100+3000), 'string'), "NAME_LASTNAME") as lastname, 
        pii:fake(convert(math:round(math:rand()*100+4000), 'string'), "ADDRESS_CITY") as city
from dupStreamTrigger
insert into dupStreamPublisher;
 
```

**dup-stream-deduplicator:**
```
@App:name("dup-stream-deduplicator")
@App:description("This app removes the duplicate events")

@source(type='c8streams', stream.list='dupStreamPublisher', @map(type='json'))
define stream dupStreamPublisher (startTime long, rank string, firstname string, lastname string, city string);

-- Loggers
-------------------------------------------------------------------------------------------------------------------------------------
@sink(type="logger", priority='INFO', prefix="dup-stream-deduplicator")
define stream InfoStream(rank string, firstname string, lastname string, city string);

select rank, firstname, lastname, city
  from dupStreamPublisher#unique:deduplicate(firstname, 1 sec)
insert into InfoStream;
 
```

**fast-slow-stream-joiner:**
```
@App:name("fast-slow-stream-joiner")
@App:description("This app will join two streams based on the slowest stream")

@source(type = 'c8streams', stream.list = "fastStreamPublisher", @map(type='json'))
define stream fastStreamPublisher (startTime long, rank string, firstname string, lastname string, city string);

@source(type = 'c8streams', stream.list = "slowStreamPublisher", @map(type='json'))
define stream slowStreamPublisher (startTime long, city string, state string, country string);

-- Loggers
-------------------------------------------------------------------------------------------------------------------------------------
@sink(type="logger", priority='INFO', prefix="fast-slow-stream-joiner")
define stream InfoStream(rank string, firstname string, lastname string, city string, state string, country string);

@info(name = 'Join-on-city')
select f.rank, f.firstname, f.lastname, s.city, s.state, s.country
-- Join when events arrive in `slowStreamPublisher`.
from slowStreamPublisher as s
-- When events get matched in `time()` window, all matched events are emitted, else `null` is emitted.
    left outer join fastStreamPublisher#window.time(3 sec) as f
    on s.city == f.city
insert into InfoStream;

```

**fast-stream-publisher:**
```
@App:name("fast-stream-publisher")
@App:description("This app will produce 5 events after every 1 second")

define trigger fastStreamTrigger at every 1 sec;

-- Defines `fastStreamPublisher` stream to process events received from 'fastStreamTrigger' after every 1 second
@sink(type = 'c8streams', stream = "fastStreamPublisher")
define stream fastStreamPublisher (startTime long, rank string, firstname string, lastname string, city string);

-- 'eventTimestamp()' returns the timestamp of the processed/passed event.
select  eventTimestamp() as startTime,
        pii:fake(str:concat("title", convert(count()%3, 'string')), "NAME_TITLE") as rank, 
        pii:fake(str:concat("firstname", convert(count()%3, 'string')), "NAME_FIRSTNAME") as firstname, 
        pii:fake(str:concat("lastname", convert(count()%3, 'string')), "NAME_LASTNAME") as lastname, 
        pii:fake(str:concat("city", convert(math:round(math:rand()*10+4000), 'string')), "ADDRESS_CITY") as city
from fastStreamTrigger
insert into fastStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(str:concat("title", convert(count()%3, 'string')), "NAME_TITLE") as rank, 
        pii:fake(str:concat("firstname", convert(count()%3, 'string')), "NAME_FIRSTNAME") as firstname, 
        pii:fake(str:concat("lastname", convert(count()%3, 'string')), "NAME_LASTNAME") as lastname, 
        pii:fake(str:concat("city", convert(math:round(math:rand()*10+4000), 'string')), "ADDRESS_CITY") as city
from fastStreamTrigger
insert into fastStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(str:concat("title", convert(count()%3, 'string')), "NAME_TITLE") as rank, 
        pii:fake(str:concat("firstname", convert(count()%3, 'string')), "NAME_FIRSTNAME") as firstname, 
        pii:fake(str:concat("lastname", convert(count()%3, 'string')), "NAME_LASTNAME") as lastname, 
        pii:fake(str:concat("city", convert(math:round(math:rand()*10+4000), 'string')), "ADDRESS_CITY") as city
from fastStreamTrigger
insert into fastStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(convert(math:round(math:rand()*100+5000), 'string'), "NAME_TITLE") as rank, 
        pii:fake(convert(math:round(math:rand()*100+2000), 'string'), "NAME_FIRSTNAME") as firstname, 
        pii:fake(convert(math:round(math:rand()*100+3000), 'string'), "NAME_LASTNAME") as lastname, 
        pii:fake(str:concat("city", convert(math:round(math:rand()*10+4000), 'string')), "ADDRESS_CITY") as city
from fastStreamTrigger
insert into fastStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(convert(math:round(math:rand()*100+5000), 'string'), "NAME_TITLE") as rank, 
        pii:fake(convert(math:round(math:rand()*100+2000), 'string'), "NAME_FIRSTNAME") as firstname, 
        pii:fake(convert(math:round(math:rand()*100+3000), 'string'), "NAME_LASTNAME") as lastname, 
        pii:fake(str:concat("city", convert(math:round(math:rand()*10+4000), 'string')), "ADDRESS_CITY") as city
from fastStreamTrigger
insert into fastStreamPublisher;
```

**slow-stream-publisher:**
```
@App:name("slow-stream-publisher")
@App:description("This app will produce 2 events after every 3 seconds")

define trigger slowStreamTrigger at every 3 sec;

-- Defines `slowStreamPublisher` stream to process events received from 'slowStreamTrigger' after every 1 second
@sink(type = 'c8streams', stream = "slowStreamPublisher")
define stream slowStreamPublisher (startTime long, city string, state string, country string);

-- 'eventTimestamp()' returns the timestamp of the processed/passed event.
select  eventTimestamp() as startTime,
        pii:fake(str:concat("city", convert(math:round(math:rand()*10+4000), 'string')), "ADDRESS_CITY") as city, 
        pii:fake(str:concat("state", convert(math:round(math:rand()*10+6000), 'string')), "ADDRESS_STATE") as state, 
        pii:fake(str:concat("country", convert(math:round(math:rand()*10+7000), 'string')), "ADDRESS_COUNTRY") as country
from slowStreamTrigger
insert into slowStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(str:concat("city", convert(math:round(math:rand()*10+4000), 'string')), "ADDRESS_CITY") as city, 
        pii:fake(str:concat("state", convert(math:round(math:rand()*10+6000), 'string')), "ADDRESS_STATE") as state, 
        pii:fake(str:concat("country", convert(math:round(math:rand()*10+7000), 'string')), "ADDRESS_COUNTRY") as country
from slowStreamTrigger
insert into slowStreamPublisher;

/*
select  eventTimestamp() as startTime,
        pii:fake(str:concat("city", convert(count()%3, 'string')), "ADDRESS_CITY") as city, 
        pii:fake(str:concat("state", convert(count()%3, 'string')), "ADDRESS_STATE") as state, 
        pii:fake(str:concat("country", convert(count()%3, 'string')), "ADDRESS_COUNTRY") as country
from slowStreamTrigger
insert into slowStreamPublisher;

```
**unordered-stream-processor:**
```
@App:name("unordered-stream-processor")
@App:description("This app will order out of order stream events")

-- Stream with unordered events
-------------------------------------------------------------------------------------------------------------------------------------
@source(type='c8streams', stream.list='unorderedStreamPublisher', @map(type='json'))
define stream unorderedStreamPublisher (startTime long, rank string, firstname string, lastname string, city string);

-- Loggers
-------------------------------------------------------------------------------------------------------------------------------------
@sink(type="logger", priority='INFO', prefix="Ordered-Output-Stream")
define stream InfoStream(rank string, firstname string, lastname string, city string);

-- Reorder
select rank, firstname, lastname, city
  from unorderedStreamPublisher#reorder:akslack(startTime, 1)#window.time(3 sec)
insert into InfoStream;

```
**unordered-stream-publisher:**
```
@App:name("unordered-stream-publisher")
@App:description("This app will produce 10 events after every 1 second")


define trigger unorderedStreamPublisherTrigger at every 1 sec;

-- Defines `unorderedStreamPublisher` stream to process events received from 'unorderedStreamPublisherTrigger' after every 1 seconds
@sink(type = 'c8streams', stream = "unorderedStreamPublisher")
define stream unorderedStreamPublisher (startTime long, rank string, firstname string, lastname string, city string);

-- 'eventTimestamp()' returns the timestamp of the processed/passed event.
select  eventTimestamp() as startTime,
        pii:fake(convert(math:round(math:rand()*100+5000), 'string'), "NAME_TITLE") as rank, 
        pii:fake(convert(math:round(math:rand()*100+2000), 'string'), "NAME_FIRSTNAME") as firstname, 
        pii:fake(convert(math:round(math:rand()*100+3000), 'string'), "NAME_LASTNAME") as lastname, 
        pii:fake(convert(math:round(math:rand()*100+4000), 'string'), "ADDRESS_CITY") as city
from unorderedStreamPublisherTrigger
insert into unorderedStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(convert(math:round(math:rand()*100+5000), 'string'), "NAME_TITLE") as rank, 
        pii:fake(convert(math:round(math:rand()*100+2000), 'string'), "NAME_FIRSTNAME") as firstname, 
        pii:fake(convert(math:round(math:rand()*100+3000), 'string'), "NAME_LASTNAME") as lastname, 
        pii:fake(convert(math:round(math:rand()*100+4000), 'string'), "ADDRESS_CITY") as city
from unorderedStreamPublisherTrigger
insert into unorderedStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(convert(math:round(math:rand()*100+5000), 'string'), "NAME_TITLE") as rank, 
        pii:fake(convert(math:round(math:rand()*100+2000), 'string'), "NAME_FIRSTNAME") as firstname, 
        pii:fake(convert(math:round(math:rand()*100+3000), 'string'), "NAME_LASTNAME") as lastname, 
        pii:fake(convert(math:round(math:rand()*100+4000), 'string'), "ADDRESS_CITY") as city
from unorderedStreamPublisherTrigger
insert into unorderedStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(convert(math:round(math:rand()*100+5000), 'string'), "NAME_TITLE") as rank, 
        pii:fake(convert(math:round(math:rand()*100+2000), 'string'), "NAME_FIRSTNAME") as firstname, 
        pii:fake(convert(math:round(math:rand()*100+3000), 'string'), "NAME_LASTNAME") as lastname, 
        pii:fake(convert(math:round(math:rand()*100+4000), 'string'), "ADDRESS_CITY") as city
from unorderedStreamPublisherTrigger
insert into unorderedStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(convert(math:round(math:rand()*100+5000), 'string'), "NAME_TITLE") as rank, 
        pii:fake(convert(math:round(math:rand()*100+2000), 'string'), "NAME_FIRSTNAME") as firstname, 
        pii:fake(convert(math:round(math:rand()*100+3000), 'string'), "NAME_LASTNAME") as lastname, 
        pii:fake(convert(math:round(math:rand()*100+4000), 'string'), "ADDRESS_CITY") as city
from unorderedStreamPublisherTrigger
insert into unorderedStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(convert(math:round(math:rand()*100+5000), 'string'), "NAME_TITLE") as rank, 
        pii:fake(convert(math:round(math:rand()*100+2000), 'string'), "NAME_FIRSTNAME") as firstname, 
        pii:fake(convert(math:round(math:rand()*100+3000), 'string'), "NAME_LASTNAME") as lastname, 
        pii:fake(convert(math:round(math:rand()*100+4000), 'string'), "ADDRESS_CITY") as city
from unorderedStreamPublisherTrigger
insert into unorderedStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(convert(math:round(math:rand()*100+5000), 'string'), "NAME_TITLE") as rank, 
        pii:fake(convert(math:round(math:rand()*100+2000), 'string'), "NAME_FIRSTNAME") as firstname, 
        pii:fake(convert(math:round(math:rand()*100+3000), 'string'), "NAME_LASTNAME") as lastname, 
        pii:fake(convert(math:round(math:rand()*100+4000), 'string'), "ADDRESS_CITY") as city
from unorderedStreamPublisherTrigger
insert into unorderedStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(convert(math:round(math:rand()*100+5000), 'string'), "NAME_TITLE") as rank, 
        pii:fake(convert(math:round(math:rand()*100+2000), 'string'), "NAME_FIRSTNAME") as firstname, 
        pii:fake(convert(math:round(math:rand()*100+3000), 'string'), "NAME_LASTNAME") as lastname, 
        pii:fake(convert(math:round(math:rand()*100+4000), 'string'), "ADDRESS_CITY") as city
from unorderedStreamPublisherTrigger
insert into unorderedStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(convert(math:round(math:rand()*100+5000), 'string'), "NAME_TITLE") as rank, 
        pii:fake(convert(math:round(math:rand()*100+2000), 'string'), "NAME_FIRSTNAME") as firstname, 
        pii:fake(convert(math:round(math:rand()*100+3000), 'string'), "NAME_LASTNAME") as lastname, 
        pii:fake(convert(math:round(math:rand()*100+4000), 'string'), "ADDRESS_CITY") as city
from unorderedStreamPublisherTrigger
insert into unorderedStreamPublisher;

select  eventTimestamp() as startTime,
        pii:fake(convert(math:round(math:rand()*100+5000), 'string'), "NAME_TITLE") as rank, 
        pii:fake(convert(math:round(math:rand()*100+2000), 'string'), "NAME_FIRSTNAME") as firstname, 
        pii:fake(convert(math:round(math:rand()*100+3000), 'string'), "NAME_LASTNAME") as lastname, 
        pii:fake(convert(math:round(math:rand()*100+4000), 'string'), "ADDRESS_CITY") as city
from unorderedStreamPublisherTrigger
insert into unorderedStreamPublisher;

```