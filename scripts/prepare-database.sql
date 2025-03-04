drop table if exists kommune;
create table kommune
as
select
    kommunenavn,
    kommunenummer,
    omrade,
    st_transform(omrade, 3857) omrade_3857
from kommuner_4d2a1f720b994f11baaeae13ee600c8e.kommune;

drop table if exists vegadresse;
create table vegadresse
as
SELECT
    st_transform(representasjonspunkt, 3857) representasjonspunkt_3857,
    adressenavn,
    nummer,
    bokstav,
    adressetekst,
    postnummer,
    poststed
FROM matrikkelenvegadresse_c817ee4e6249443d8bc14426eb6cbab0.vegadresse;
create index vegadresse_representasjonspunkt on vegadresse
using gist(representasjonspunkt_3857);

drop table if exists grunnskole;
create table grunnskole
as
select st_transform(posisjon, 3857) posisjon_3857,
       skolenavn,
       eierforhold,
       antallelever
from grunnskoler_3697913259634315b061b324a3f2cf59.grunnskole;
create index grunnskole_posisjon on grunnskole
using gist(posisjon_3857);