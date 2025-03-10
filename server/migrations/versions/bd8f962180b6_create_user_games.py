"""create user games

Revision ID: bd8f962180b6
Revises: d3f33c21f837
Create Date: 2025-02-18 15:44:30.296394

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bd8f962180b6'
down_revision = 'd3f33c21f837'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_games',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('game_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['game_id'], ['games.id'], name=op.f('fk_user_games_game_id_games')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_user_games_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_user_games'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_games')
    # ### end Alembic commands ###
