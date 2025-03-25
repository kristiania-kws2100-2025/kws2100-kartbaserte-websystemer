drop table if exists grunnskole;
create table grunnskole
as
select *
from grunnskoler_3697913259634315b061b324a3f2cf59.grunnskole;

drop table if exists fylke;
create table fylke
as
select fylkesnummer, navn, omrade
from fylker_ba7aea2735714391a98b1a585644e98a.fylke
         inner join fylker_ba7aea2735714391a98b1a585644e98a.administrativenhetnavn
                    on fylke.objid = administrativenhetnavn.fylke_fk and administrativenhetnavn.sprak = 'nor'
;
