"""create games

Revision ID: d2aa7d7bde6f
Revises: 23085e5fd3e7
Create Date: 2025-02-18 12:21:42.669462

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd2aa7d7bde6f'
down_revision = '23085e5fd3e7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('games',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_games')),
    sa.UniqueConstraint('title', name=op.f('uq_games_title'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('games')
    # ### end Alembic commands ###
