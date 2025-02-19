drop table if exists kommune;
create table kommune
as
select kommunenavn,
       kommunenummer,
       omrade,
       st_transform(omrade, 3857)                   omrade_3857,
       st_transform(st_simplify(omrade, 100), 3857) omrade_3857_simple,
       st_transform(omrade, 4326)                   omrade_4326
from kommuner_4d2a1f720b994f11baaeae13ee600c8e.kommune;
