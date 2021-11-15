CREATE USER web3images_api;
GRANT USAGE ON SCHEMA public TO web3images_api;
GRANT SELECT ON tbl_token_transfers TO web3images_api;
GRANT SELECT ON tbl_token_metadatas TO web3images_api;
GRANT SELECT ON tbl_collections TO web3images_api;
