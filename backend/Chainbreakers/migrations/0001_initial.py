# Generated by Django 4.1.2 on 2022-10-28 23:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(default='Unknown', max_length=250)),
                ('quant', models.IntegerField(default=0)),
                ('fiat', models.FloatField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('trans_id', models.AutoField(primary_key=True, serialize=False)),
                ('price', models.FloatField(default=0)),
                ('quant', models.IntegerField(default=0)),
                ('buyer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='buyer', to='Chainbreakers.profile')),
                ('seller', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='seller', to='Chainbreakers.profile')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('order_id', models.AutoField(primary_key=True, serialize=False)),
                ('quant1', models.IntegerField(default=0)),
                ('buy', models.BooleanField()),
                ('price', models.FloatField(default=0)),
                ('market', models.BooleanField()),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user', to='Chainbreakers.profile')),
            ],
        ),
    ]