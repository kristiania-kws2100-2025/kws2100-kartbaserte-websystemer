drop table if exists grunnkrets;
create table grunnkrets
as
select grunnkretsnummer, grunnkretsnavn, omrade, st_transform(omrade, 4326) as omrade_4326
from grunnkretser_e64b0fa8697b467cba35496995f68445.grunnkrets;
create index grunnkrets_omrade_idx on grunnkrets
    using gist (omrade);

drop table if exists vegadresse;
create table vegadresse
as
select adressetekst, representasjonspunkt
from matrikkelenvegadresse_cf796875914b46499371f25be8b4c720.vegadresse;
create index vegadresse_representasjonspunkt on vegadresse
    using gist (representasjonspunkt);

drop table if exists grunnskole;
create table grunnskole
as
select skolenavn,
       organisasjonsnummer,
       lavestetrinn,
       hoyestetrinn,
       antallelever,
       antallansatte,
       st_transform(posisjon, 25832) as posisjon
from grunnskoler_3697913259634315b061b324a3f2cf59.grunnskole;
create index grunnskole_posisjon on grunnskole
    using gist (posisjon);

drop table if exists skolerapport;
create table skolerapport
as
select grunnkretsnavn,
       grunnkretsnummer,
       (select count(*) from vegadresse where st_contains(omrade, representasjonspunkt)) as antall_adresser,
       (select count(*)
        from vegadresse
                 left outer join grunnskole on st_dwithin(posisjon, representasjonspunkt, 750)
        where st_contains(omrade, representasjonspunkt)
          and organisasjonsnummer is null)                                               as antall_over_750m_fra_skole,
       (select count(*)
        from vegadresse
                 left outer join grunnskole on st_dwithin(posisjon, representasjonspunkt, 1500)
        where st_contains(omrade, representasjonspunkt)
          and organisasjonsnummer is null)                                               as antall_over_1500m_fra_skole,
       omrade_4326::json                                                                 as geometry
from grunnkrets;
