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

drop table if exists vegadresse;
create table vegadresse
as
select adresseid,
       adressetekst,
       adressenavn,
       bokstav,
       nummer,
       representasjonspunkt,
       st_transform(representasjonspunkt, 4326) representasjonspunkt_4326,
       st_transform(representasjonspunkt, 3857) representasjonspunkt_3857
from matrikkelenvegadresse_71a47c657f3c4bbd83ebafaf8fb8a43e.vegadresse;

create index vegadresse_representasjonspunkt_3857_idx
on vegadresse using GIST (representasjonspunkt_3857);
