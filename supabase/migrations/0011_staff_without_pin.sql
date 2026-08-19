-- The shop asked for a till with no PIN at all: one account, no credential to
-- type, so pin stops being required. The column stays for shops that may want
-- PINs back later; a null pin simply means "no PIN set".
alter table staff alter column pin drop not null;
