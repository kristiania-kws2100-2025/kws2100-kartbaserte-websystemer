drop table if exists grunnkrets;
create table grunnkrets
as
select grunnkretsnummer, grunnkretsnavn, omrade, st_transform(omrade, 4326) as omrade_4326
from grunnkretser_e64b0fa8697b467cba35496995f68445.grunnkrets;
create index grunnkrets_omrade_idx on grunnkrets
using gist(omrade);

drop table if exists vegadresse;
create table vegadresse
as
select adressetekst, representasjonspunkt
from matrikkelenvegadresse_cf796875914b46499371f25be8b4c720.vegadresse;
create index vegadresse_representasjonspunkt on vegadresse
    using gist(representasjonspunkt);
