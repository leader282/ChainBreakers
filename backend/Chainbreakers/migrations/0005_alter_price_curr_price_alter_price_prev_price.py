# Generated by Django 4.1.2 on 2022-10-30 05:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Chainbreakers', '0004_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='price',
            name='curr_price',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='price',
            name='prev_price',
            field=models.FloatField(default=0),
        ),
    ]
