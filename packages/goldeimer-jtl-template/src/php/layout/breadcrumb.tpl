{strip}
{has_boxes position='left' assign='hasLeftBox'}
{if !empty($Brotnavi) && !$bExclusive && !$bAjaxRequest && $nSeitenTyp != 18 && $nSeitenTyp != 11 && $nSeitenTyp != 38}
    <div class="breadcrumb-wrapper hidden-sm hidden-md hidden-lg hidden-xl hidden-xs">
        <div class="row">
            <div class="col-xs-12" style="display: none !important;">
                <ul id="breadcrumb" class="breadcrumb" itemprop="breadcrumb" itemscope itemtype="http://schema.org/BreadcrumbList">
                    {foreach name=navi from=$Brotnavi item=oItem}
                        {if $smarty.foreach.navi.first}
                            {block name="breadcrumb-first-item"}
                                <li class="breadcrumb-item first" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                                    <a itemprop="item" href="{$oItem->urlFull}" title="{$oItem->name|escape:'html'}">
                                        <span class="fa fa-home"></span>
                                        <span itemprop="name" class="hidden">{$oItem->name|escape:'html'}</span>
                                    </a>
                                    <meta itemprop="url" content="{$oItem->urlFull}" />
                                    <meta itemprop="position" content="{$smarty.foreach.navi.iteration}" />
                                </li>
                            {/block}
                        {elseif $smarty.foreach.navi.last}
                            {block name="breadcrumb-last-item"}
                                <li class="breadcrumb-item last" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                                    <span itemprop="name">
                                        {if $oItem->name !== null}
                                            {if $oItem->hasChild === true}
                                                <a href="{$oItem->urlFull}" title="{$oItem->name|escape:'html'}">{$oItem->name}</a>
                                            {else}
                                                {$oItem->name}
                                            {/if}
                                        {elseif isset($Suchergebnisse->SuchausdruckWrite)}
                                            {$Suchergebnisse->SuchausdruckWrite}
                                        {/if}
                                    </span>
                                    <meta itemprop="position" content="{$smarty.foreach.navi.iteration}" />
                                </li>
                            {/block}
                        {else}
                            {block name="breadcrumb-item"}
                                <li class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                                    <a itemprop="item" href="{$oItem->urlFull}" title="{$oItem->name|escape:'html'}">
                                        <span itemprop="name">{$oItem->name}</span>
                                    </a>
                                    <meta itemprop="url" content="{$oItem->urlFull}" />
                                    <meta itemprop="position" content="{$smarty.foreach.navi.iteration}" />
                                </li>
                            {/block}
                        {/if}
                    {/foreach}
                </ul>
            </div>
        </div>
    </div>
{/if}
{/strip}