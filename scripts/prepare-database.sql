drop table if exists kommune;
create table kommune
as
select
    kommunenavn,
    kommunenummer,
    omrade,
    st_transform(omrade, 3857) omrade_3857
from kommuner_4d2a1f720b994f11baaeae13ee600c8e.kommune;
