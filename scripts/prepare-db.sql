drop table if exists grunnkrets;
create table grunnkrets
as
select grunnkretsnummer, grunnkretsnavn, omrade, st_transform(omrade, 4326) as omrade_4326
from grunnkretser_e64b0fa8697b467cba35496995f68445.grunnkrets;
