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