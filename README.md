# Realtime ETL using GDN

Building real-time ETL solution for synthetic bank data using GDN

![realtime-etl.png](realtime-etl.png)

### Setup

| **Federation** | **Email** | **Passsword** |
|------------|----------|--------------|
| [Global Data Network](https://gdn.paas.macrometa.io/) | demo@macrometa.io | `xxxxxxxx`| 
| [Analytics Dashboard](https://dashboards.poc.macrometa.io/d/tWcKbZ8Mz/demo-realtime-log-analytics?orgId=1) | -- | -- |

**How To Run:**

**On Federation:**
> ```
> Create and publish following Stream Workers in your federation:
> 1. etl-bank-txn-publisher
> 2. etl-bank-subscriptions-publisher
> 3. etl-bank-txn-enricher
> 4. etl-bank-subscription-enricher
> 5. etl-bank-totals
> 
> Following doc collections are created automatically:
> 1. etl-bank-transactions-raw (seed data, global)
> 2. etl-bank-subscriptions-raw (seed data, global)
> 3. etl-bank-categories (seed data, global)
> 4. etl-bank-clients (seed data, global)
> 5. etl-bank-transactions (local)
> 6. etl-bank-subscriptions (local)
> 7. etl-bank-client-totals (local)
> 8. etl-bank-company-totals (local)
> 9. etl-bank-category-totals (local)
> 
> Note: If you have run this tutorial before, you may want to truncate the collections.
> ```

**On Development Machine:**

**PLEASE FIX THIS**
> ```
> git clone https://github.com/Macrometacorp/tutorial-log-analytics.git
> cd tutorial-log-analytics
> git fetch
> git checkout gh-pages
> npm install
> browserify producer.js > bundle.js //required if you make any changes in the producer.js
> #Open index.html in browser.
> #Enter your federation details and click on Publish button. 
> #The logs will be published on `c8locals.input_log_stream`. The aggreation collections will be populated.
> ```

### Stream Workers

**etl-bank-txn-publisher:**
```

```

**etl-bank-subscriptions-publisher:**
```

```

**etl-bank-txn-enricher:**
```

```

**etl-bank-subscription-enricher:**
```

```

**etl-bank-totals:**
```

```


### Document Collections

1. etl-bank-transactions-raw (seed data, global)
2. etl-bank-subscriptions-raw (seed data, global)
3. etl-bank-categories (seed data, global)
4. etl-bank-clients (seed data, global)
5. etl-bank-transactions (local)
6. etl-bank-subscriptions (local)
7. etl-bank-client-totals (local)
8. etl-bank-company-totals (local)
9. etl-bank-category-totals (local)

### Indexes

TBD

### Query Workers

**Query worker1:**
```

```

**Query worker2:**
```

```

**Query worker3:**
```

```


### Developer Notes

**PLEASE FIX THIS**

* `index.html` renders the UI of https://macrometacorp.github.io/demo-realtime-log-analytics . The page refers to `bundle.js` script. `bundle.js` is bundled version of `producer.js` and all of its dependencies.
* Each time you update the `producer.js` you need to rebuild the `bundle.js` file.<br/>
* Use below command to do the same. Also make sure you chekin `bundle.js` along with `producer.js`<br/>
`browserify producer.js > bundle.js`



