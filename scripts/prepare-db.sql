drop table if exists fylke_2023;
create table fylke_2023
as
select fylke.omrade, navn.navn
from fylker_ba7aea2735714391a98b1a585644e98a.fylke fylke
         inner join fylker_ba7aea2735714391a98b1a585644e98a.administrativenhetnavn navn
                    on fylke.objid = navn.fylke_fk and navn.sprak = 'nor';
create index fylke_omrade_idx on fylke_2023 using gist (omrade);

drop table if exists grunnskole;
create table grunnskole
as
select *, st_transform(posisjon, 4326) as posisjon_4326
from grunnskoler_3697913259634315b061b324a3f2cf59.grunnskole;

create index grunnskole_posisjon_idx on grunnskole using gist (posisjon);
create index grunnskole_posisjon_4326_idx on grunnskole using gist (posisjon_4326);

drop table if exists vegadresse;
create table vegadresse
as
select adresseid, adressetekst,
         representasjonspunkt as representasjonspunkt_25832,
         st_transform(representasjonspunkt, 25833) as representasjonspunkt_25833,
         st_transform(representasjonspunkt, 4326) as representasjonspunkt_4326
from matrikkelenvegadresse_26c5f9465a1841b4b11408cd04fc11ac.vegadresse;

create index vegadresse_representasjonspunkt_25832_idx on vegadresse using gist (representasjonspunkt_25832);
create index vegadresse_representasjonspunkt_25833_idx on vegadresse using gist (representasjonspunkt_25833);
create index vegadresse_representasjonspunkt_4326_idx on vegadresse using gist (representasjonspunkt_4326);

drop table if exists grunnkrets;
create table grunnkrets
as
select grunnkretsnummer, grunnkretsnavn, kommunenummer, omrade, st_transform(omrade, 4326) as omrade_4326
from grunnkretser_4ca4b8be44e74932bc6073a9b223ea66.grunnkrets
create index grunnkrets_omrade_idx on grunnkrets using gist (omrade);
