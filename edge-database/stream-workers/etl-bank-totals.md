```js
@App:name("etl-bank-totals")
@App:description("etl-bank-totals")

/*
This app will calculate the total of amount for clientname, companyname, productcategoryname from the data published in EtlTransactionStream and published the calculated data in EtlBankClientNameTotalStream, EtlBankCompanyNameTotalStream and EtlBankCategoryNameTotalStream. Also it will populate calculated data in etlbankclienttotals, etlbankcompanytotals
and etlbankcategorytotals tables.
*/


-- Source definition. Stream worker reads transactions from this EtlTransactionStream global stream.
@source(type = 'c8streams',  stream.list="EtlTransactionStream" , replication.type="global", @map(type='json'))
define stream EtlTransactionStream (txn_id string, client_id string, product_category string, product_company string, subtype string, amount double, date string, transaction_type string, client_name string, product_category_name string);

-- Table definition. Stream worker writes purchaser(client)totals to this table - etlbankclienttotals.
@store(type='c8db', collection='etl_bank_client_totals', replication.type="global")
define table etlbankclienttotals(client_name string, total_amount double);

-- Table definition. Stream worker writes merchant(company)totals to this table - etlbankcompanytotals.
@store(type='c8db', collection='etl_bank_company_totals', replication.type="global")
define table etlbankcompanytotals(product_company string, total_amount double);

-- Table definition. Stream worker writes category totals to this table - etlbankcategorytotals.
@store(type='c8db', collection='etl_bank_category_totals', replication.type="global")
define table etlbankcategorytotals(product_category_name string, total_amount double);


-- Streams for calculating the totals 
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- Sink definition for EtlBankClientNameTotalStream  worker.
@sink(type = 'c8streams', stream = "EtlBankClientNameTotalStream", replication.type="global")
define stream EtlBankClientNameTotalStream (client_name string, total_amount double);

-- Sink definition for EtlBankCompanyNameTotalStream  worker.
@sink(type = 'c8streams', stream = "EtlBankCompanyNameTotalStream", replication.type="global")
define stream EtlBankCompanyNameTotalStream (product_company string, total_amount double);

-- Sink definition for EtlBankCategoryNameTotalStream  worker.
@sink(type = 'c8streams', stream = "EtlBankCategoryNameTotalStream", replication.type="global")
define stream EtlBankCategoryNameTotalStream (product_category_name string, total_amount double);


/**
Writes each of the enriched purchaser(client)totals  messages from EtlTransactionStream to EtlBankClientNameTotalStream.  
*/
select client_name, sum(amount) as total_amount
from EtlTransactionStream group by client_name
insert into EtlBankClientNameTotalStream;

/**
Writes each of the  purchaser(client)totals  messages from EtlBankClientNameTotalStream to etlbankclienttotals.  
*/
select  client_name,  total_amount
from EtlBankClientNameTotalStream 
update or insert into etlbankclienttotals 
    on etlbankclienttotals.client_name == client_name;

/**
Writes each of the enriched merchant(company)totals  messages from EtlTransactionStream to EtlBankCompanyNameTotalStream.  
*/
select product_company, sum(amount) as total_amount
from EtlTransactionStream group by product_company
insert into EtlBankCompanyNameTotalStream;

/**
Writes each of the  merchant(company)totals  messages from EtlBankCompanyNameTotalStream to etlbankcompanytotals.  
*/
select  product_company,  total_amount
from EtlBankCompanyNameTotalStream 
update or insert into etlbankcompanytotals 
    on etlbankcompanytotals.product_company == product_company;

/**
Writes each of the enriched category totals  messages from EtlTransactionStream to EtlBankCategoryNameTotalStream.  
*/
select product_category_name, sum(amount) as total_amount
from EtlTransactionStream group by product_category_name
insert into EtlBankCategoryNameTotalStream;

/**
Writes each of the  category totals  messages from EtlBankCategoryNameTotalStream to etlbankcategorytotals.  
*/
select  product_category_name,  total_amount
from EtlBankCategoryNameTotalStream 
update or insert into etlbankcategorytotals 
    on etlbankcategorytotals.product_category_name == product_category_name;
 
 
```
