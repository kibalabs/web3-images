import sqlalchemy

metadata = sqlalchemy.MetaData()

TokenMetadataTable = sqlalchemy.Table(
    'tbl_token_metadatas',
    metadata,
    sqlalchemy.Column(key='tokenMetadataId', name='id', type_=sqlalchemy.Integer, autoincrement=True, primary_key=True, nullable=False),
    sqlalchemy.Column(key='createdDate', name='created_date', type_=sqlalchemy.DateTime, nullable=False),
    sqlalchemy.Column(key='updatedDate', name='updated_date', type_=sqlalchemy.DateTime, nullable=False),
    sqlalchemy.Column(key='registryAddress', name='registry_address', type_=sqlalchemy.Text, nullable=False),
    sqlalchemy.Column(key='tokenId', name='token_id', type_=sqlalchemy.Integer, nullable=False),
    sqlalchemy.Column(key='metadataUrl', name='metadata_url', type_=sqlalchemy.Text, nullable=False),
    sqlalchemy.Column(key='imageUrl', name='image_url', type_=sqlalchemy.TEXT, nullable=True),
    sqlalchemy.Column(key='name', name='name', type_=sqlalchemy.Text, nullable=True),
    sqlalchemy.Column(key='description', name='description', type_=sqlalchemy.Text, nullable=True),
    sqlalchemy.Column(key='attributes', name='attributes', type_=sqlalchemy.JSON, nullable=True),
)
