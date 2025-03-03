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
select
    adresseid, adressekode, adressetekst,
    adressenavn, nummer, bokstav, postnummer, poststed,
    representasjonspunkt,
    st_transform(representasjonspunkt, 3857) as representasjonspunkt_3857
from matrikkelenadresse_49f3a8437d6443de8b4e042d78436756.vegadresse;
create index vegadresse_rep_3857_index on vegadresse using gist(representasjonspunkt_3857);