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

